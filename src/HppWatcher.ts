/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   HppWatcher.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ldedier <ldedier@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/07/09 06:09:27 by ldedier           #+#    #+#             */
/*   Updated: 2019/10/01 04:56:05 by ldedier          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import * as vscode from 'vscode';
import * as escapeRegExp from 'escape-string-regexp';

import HppClassFiller from './HppClassFiller';

class HppWatcher
{
	public fileSystemWatcher : vscode.FileSystemWatcher;
	public command: string;

	constructor()
	{
		this.fileSystemWatcher =
			vscode.workspace.createFileSystemWatcher("**/[A-Z]{[A-Z],[a-z]}*.hpp", false, true, true);
		this.fileSystemWatcher.onDidCreate(this.onCreateHpp);
		this.command = (vscode.workspace.getConfiguration().get('hpp-skeleton.headerCommandId') as string).trim();
	}

	private selectPostCreation(editor: vscode.TextEditor, filler: HppClassFiller)
	{
		const text = editor.document.getText();
		const regex = RegExp(escapeRegExp(filler.placeHolder), 'g');
		if (regex.test(text))
		{
			const selection = new vscode.Selection(
				editor.document.positionAt(regex.lastIndex - filler.placeHolder.length),
					 editor.document.positionAt(regex.lastIndex));
			editor.selection = selection;
		}
	}

	private processOnCreateHpp(editor: vscode.TextEditor)
	{
		const filler: HppClassFiller = new HppClassFiller(editor.document);
		editor.edit(edit => {
			const pos: vscode.Position = editor.selection.active;
			edit.insert(pos,
				[
					"#ifndef " + filler.defineString,
					"# define " + filler.defineString + ((filler.includes.length > 0) ? "\n" : ""),
						filler.includes.map(include => "# include " + include).join("\n")  + ((filler.includes.length > 0) ? "\n" : ""),
					"class " + filler.className,
					"{",
					"\tpublic:",
					filler.publicMethodsPrototypes.map(s => "\t\t" + s + ";").join("\n"),
					"",
					"\tprivate:",
					filler.privateMethodsPrototypes.map(s => "\t\t" + s + ";").join("\n") + ((filler.privateMethodsPrototypes.length > 0) ? "\n" : ""),
					"};" + ((filler.functionsPrototypes.length > 0) ? "\n" : ""),
					filler.functionsPrototypes.map(func => func + ";").join("\n"),
					"#endif"
				].join("\n"));
		}).then(() => {
			this.selectPostCreation(editor, filler);
		})
	}

	private onCreateHpp = (uri: vscode.Uri) => {
		if (vscode.window.activeTextEditor
			&& vscode.window.activeTextEditor.document.uri.path == uri.path
				&& vscode.window.activeTextEditor.document.getText().length == 0)
		{
			let editor = vscode.window.activeTextEditor as vscode.TextEditor;
			if (this.command && this.command.length > 0)
			{
				vscode.commands.executeCommand(this.command).then(() => {
					vscode.window.showTextDocument(editor.document, 1, false).then(() => {
						this.processOnCreateHpp(editor);
					})
				}, (err)=> {
					vscode.window.showErrorMessage("hpp-skeleton: " + err.message);
				})
			}
			else
				this.processOnCreateHpp(editor);
		}
	}
}
export default HppWatcher;