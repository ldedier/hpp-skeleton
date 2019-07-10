// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import HppWatcher from './HppWatcher';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

// vscode.commands.registerCommand('extension.helloWorld', () => {
// 	vscode.window.showInformationMessage('Hello VSCode!');
// });


// vscode.commands.registerCommand('explorer.newFile', (e) => {
//  	console.log("e:", e);
//  });

//  vscode.commands.registerCommand('extension.showTime', (arg) => {
// 	const date: Date = new Date();
// 	vscode.window.showInformationMessage("arg: " + arg);
// });

const watcher: HppWatcher = new HppWatcher();

//FileSystemProvider

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "helloworld" is now active!');
}

// this method is called when your extension is deactivated
export function deactivate() {}
