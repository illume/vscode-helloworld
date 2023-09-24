// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "helloworld" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "helloworld.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from THE CLOUD!");
    }
  );

  context.subscriptions.push(disposable);

  // Open headlamp in a webview.
  context.subscriptions.push(
    vscode.commands.registerCommand("helloworld.openWebView", () => {
      const panel = vscode.window.createWebviewPanel(
        "webview",
        "Headlamp",
        vscode.ViewColumn.One,
        {
          enableScripts: true, // Enables JavaScript for the WebView.
          retainContextWhenHidden: true, // Keeps the WebView context even when it is not visible.
        }
      );

      function getWebviewContent() {
        return `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <meta http-equiv="Content-Security-Policy" content="default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';" />
                  <title>WebView Demo</title>
              </head>
              <body>
                  hello wo
                  <iframe src="http://localhost:3000" width="100%" height="900px" frameborder="0" seamless></iframe>
              </body>
              </html>
          `;
      }

      panel.webview.html = getWebviewContent();
    })
  );

  // Display a message box to the user on load if they haven't seen it yet.
  if (!context.globalState.get("hasShownReadme")) {
    console.log("hello");
    vscode.window
      .showInformationMessage(
        "Would you like to see the README file?",
        "Yes",
        "No"
      )
      .then((selection) => {
        if (selection === "Yes") {
          vscode.commands.executeCommand(
            "markdown.showPreview",
            vscode.Uri.file(context.asAbsolutePath("README.md"))
          );
        }
      });

    context.globalState.update("hasShownReadme", true);
  }

  // a helloworld command that runs echo "hello world" > /tmp/cat.txt
  context.subscriptions.push(
    vscode.commands.registerCommand("helloworld.cat", () => {
      const { exec } = require("child_process");
      exec(
        'echo "hello world" > /tmp/cat.txt',
        (err: any, stdout: any, stderr: any) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log(stdout);
        }
      );
    })
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
