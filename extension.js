// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
// const {exec,execFile,execFileSync,spawn} = require('child_process')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "go-restart" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.goRestart', function () {
		// The code you place here will be executed every time your command is executed
		console.log(vscode.window.activeTerminal.name)
		console.log(vscode.window)
		let ts = vscode.window.terminals;
		// let aT = vscode.window.activeTerminal;
		if (ts.length<9){
			ts.forEach((e,i)=>{
				if(e.name == 'go-server'){
					vscode.commands.executeCommand('workbench.action.terminal.focusAtIndex'+(i+1))
					vscode.commands.executeCommand('workbench.action.terminal.kill')
				}
			})
		}
	
		let terminal = vscode.window.createTerminal({name: "go-server"});
			terminal.show(true);
			terminal.sendText("go run main.go");
		// let terminal = vscode.window.createTerminal({name: "go-server"});
		// terminal.show(true);
		// terminal.sendText("ls");
		// var cmdStr = "cd "+vscode.workspace.workspaceFolders[0].uri.fsPath+"&&go run main.go";
		// exec(cmdStr, function(err,stdout,stderr){
		// 	console.log(err,stdout,stderr)
		// 	if(err) {
		// 		console.log('get weather api error:'+stderr);
		// 	} else {
		// 			// exec("go run main.go",(a,b,c)=>{
		// 			// 	console.log('run:'+a)
		// 			// })
		// 	}
		// });
		// execFile("cd "+vscode.workspace.workspaceFolders[0].uri.fsPath,(e,so,se)=>{
		// 	console.log(e,so,se)
		// 	execFile("go run main.go",(a,b,c)=>{
		// 		console.log('run:'+a)
		// 	})

		// })
		// const ls = spawn('ls', ['-lh', '/usr']);

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
