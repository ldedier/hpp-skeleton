/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   extension.ts                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ldedier <ldedier@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/07/10 07:37:43 by ldedier           #+#    #+#             */
/*   Updated: 2019/07/12 05:37:54 by ldedier          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import HppWatcher from './HppWatcher';

const watcher: HppWatcher = new HppWatcher();

export function activate(context: vscode.ExtensionContext) {

}

export function deactivate() {}
