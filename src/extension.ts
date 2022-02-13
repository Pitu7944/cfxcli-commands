// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import axios from 'axios';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('vscodebuttons-fivem is loaded! | Developed by Pitu7944#2711');
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('cfxcli.restartCurrentScript', () => {
		const vars = {
			fileDirname: (vscode.window.activeTextEditor) ? path.dirname(vscode.window.activeTextEditor.document.fileName) : null,
		};
		const scriptName: any = vars['fileDirname']?.substring(vars['fileDirname']?.lastIndexOf('\\') + 1);
		axios.post("http://127.0.0.1:30120/vscodebuttons/restart", {api_key: 'test_key', target_script: scriptName}).then(function (response: { data: any; }) {
			//decode data to json
			const data = response.data;
			console.log(data);
			if (data.success) {
				vscode.window.showInformationMessage(data.message);
			} else {
				vscode.window.showInformationMessage(data.message);
			}
		}).catch(function (error: any) {
			vscode.window.showInformationMessage(error);
			console.error(error);
		});
	});

	const disposable2 = vscode.commands.registerCommand('cfxcli.startCurrentScript', () => {
		const vars = {
			fileDirname: (vscode.window.activeTextEditor) ? path.dirname(vscode.window.activeTextEditor.document.fileName) : null,
		};
		const scriptName: any = vars['fileDirname']?.substring(vars['fileDirname']?.lastIndexOf('\\') + 1);
		axios.post("http://127.0.0.1:30120/vscodebuttons/start", {api_key: 'test_key', target_script: scriptName}).then(function (response: { data: any; }) {
			//decode data to json
			const data = response.data;
			console.log(data);
			if (data.success) {
				vscode.window.showInformationMessage(data.message);
			} else {
				vscode.window.showInformationMessage(data.message);
			}
		}).catch(function (error: any) {
			vscode.window.showInformationMessage(error);
			console.error(error);
		});
	});

	const disposable3 = vscode.commands.registerCommand('cfxcli.stopCurrentScript', () => {
		const vars = {
			fileDirname: (vscode.window.activeTextEditor) ? path.dirname(vscode.window.activeTextEditor.document.fileName) : null,
		};
		const scriptName: any = vars['fileDirname']?.substring(vars['fileDirname']?.lastIndexOf('\\') + 1);
		axios.post("http://127.0.0.1:30120/vscodebuttons/stop", {api_key: 'test_key', target_script: scriptName}).then(function (response: { data: any; }) {
			//decode data to json
			const data = response.data;
			console.log(data);
			if (data.success) {
				vscode.window.showInformationMessage(data.message);
			} else {
				vscode.window.showInformationMessage(data.message);
			}
		}).catch(function (error: any) {
			vscode.window.showInformationMessage(error);
			console.error(error);
		});
	});

	context.subscriptions.push(disposable);
}
