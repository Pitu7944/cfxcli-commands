// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import axios from 'axios';



function find_fxmanifest(scriptPath: string, currentDepth = 0): string {
	let foundManifest = false;
	const dir = fs.readdirSync(scriptPath);
	let result = "";
	for (let i = 0; i < dir.length; i++) {
		const file = dir[i];
		if (file.includes("__resource.lua") || file.includes("fxmanifest.lua")) {
			console.log("znaleziono fxmanifest.lua lub __resource.lua");
			console.log(`znaleziono w ${scriptPath}`);
			foundManifest = true;
			return scriptPath;
		}
	}
	if (!foundManifest && currentDepth < 10) {
		const currentpath = path.join(scriptPath, '../');
		console.log(currentpath);
		result = find_fxmanifest(currentpath, currentDepth + 1);
	} else if(currentDepth >= 10) {
		console.log("Nie znaleziono fxmanifest.lua lub __resource.lua");
		vscode.window.showInformationMessage("Nie znaleziono fxmanifest.lua lub __resource.lua");
	} else if(foundManifest){
		console.log("znaleziono fxmanifest.lua lub __resource.lua w katalogu "+ scriptPath);
		result = scriptPath;
	}
	return result;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('extension.restartCurrentScript', () => {
		const vars = {
			fileDirname: (vscode.window.activeTextEditor) ? path.dirname(vscode.window.activeTextEditor.document.fileName) : null,
		};
		const scriptPath: string = vars['fileDirname']??"";
		if (vscode.window.activeTextEditor) {
			const currentDocument = vscode.window.activeTextEditor.document;
			const configuration = vscode.workspace.getConfiguration('', currentDocument.uri);
			const config_serverIP = configuration.get('cfxcli.ip', "");
			const config_api_key = configuration.get('cfxcli.api_key', "");
			const fxmanifestpath = find_fxmanifest(scriptPath);
			const scriptName = fxmanifestpath.substring(fxmanifestpath.lastIndexOf('\\') + 1);
			console.log("fxmanifestpath: " + fxmanifestpath);
			console.log("scriptname: " + scriptName);
			axios.post(`${config_serverIP}/restart`, {api_key: config_api_key, target_script: scriptName}).then(function (response: { data: any; }) {
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
		}
	});

	const disposable2 = vscode.commands.registerCommand('extension.startCurrentScript', () => {
		const vars = {
			fileDirname: (vscode.window.activeTextEditor) ? path.dirname(vscode.window.activeTextEditor.document.fileName) : null,
		};
		const scriptPath: string = vars['fileDirname']??"";
		if (vscode.window.activeTextEditor) {
			const currentDocument = vscode.window.activeTextEditor.document;
			const configuration = vscode.workspace.getConfiguration('', currentDocument.uri);
			const config_serverIP = configuration.get('cfxcli.ip', "");
			const config_api_key = configuration.get('cfxcli.api_key', "");
			const scriptName = find_fxmanifest(scriptPath);
			axios.post(`${config_serverIP}/start`, {api_key: config_api_key, target_script: scriptName}).then(function (response: { data: any; }) {
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
		}
	});

	const disposable3 = vscode.commands.registerCommand('extension.stopCurrentScript', () => {
		const vars = {
			fileDirname: (vscode.window.activeTextEditor) ? path.dirname(vscode.window.activeTextEditor.document.fileName) : null,
		};
		const scriptPath: string = vars['fileDirname']??"";
		if (vscode.window.activeTextEditor) {
			const currentDocument = vscode.window.activeTextEditor.document;
			const configuration = vscode.workspace.getConfiguration('', currentDocument.uri);
			const config_serverIP = configuration.get('cfxcli.ip', "");
			const config_api_key = configuration.get('cfxcli.api_key', "");
			const scriptName = find_fxmanifest(scriptPath);
			axios.post(`${config_serverIP}/stop`, {api_key: config_api_key, target_script: scriptName}).then(function (response: { data: any; }) {
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
		}
	});
	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable2);
	context.subscriptions.push(disposable3);
}
