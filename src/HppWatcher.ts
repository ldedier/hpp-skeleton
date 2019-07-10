/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   HppWatcher.ts                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ldedier <ldedier@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/07/09 06:09:27 by ldedier           #+#    #+#             */
/*   Updated: 2019/07/10 06:32:20 by ldedier          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import * as vscode from 'vscode';
import * as escapeRegExp from 'escape-string-regexp';

import HppClassFiller from './HppClassFiller';

class HppWatcher
{
	public fileSystemWatcher : vscode.FileSystemWatcher;
	public shouldExecute: boolean;
	public command: string;

	constructor()
	{
		this.fileSystemWatcher =
			vscode.workspace.createFileSystemWatcher("**/[A-Z]{[A-Z],[a-z]}*.hpp", false, true, true);
		this.fileSystemWatcher.onDidCreate(this.onCreateHpp);
		this.shouldExecute = vscode.workspace.getConfiguration().get('hpp-skeleton.headerCommandShouldExecute') as boolean;
		this.command = vscode.workspace.getConfiguration().get('hpp-skeleton.headerCommandId') as string;
	}

	private selectPostCreation(editor: vscode.TextEditor, filler: HppClassFiller)
	{
		const text = editor.document.getText();
		const regex = RegExp(escapeRegExp(filler.placeHolder), 'g');
		let i: number;
		
		i = 0;
		while (regex.test(text))
		{
			const selection = new vscode.Selection(
				editor.document.positionAt(regex.lastIndex - filler.placeHolder.length),
					 editor.document.positionAt(regex.lastIndex));
			if (i++ == 0)
				editor.selection = selection;
			else
				editor.selections.push(selection);
			console.log('sel', editor.selections);
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
				].join("\n"));
		}).then(() => {
			this.selectPostCreation(editor, filler);
		})
	}

	private onCreateHpp = (uri: vscode.Uri) => {
		console.log(this);
		if (vscode.window.activeTextEditor
			&& vscode.window.activeTextEditor.document.uri.path == uri.path)
		{
			let editor = vscode.window.activeTextEditor as vscode.TextEditor;
			if (this.shouldExecute && this.command)
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