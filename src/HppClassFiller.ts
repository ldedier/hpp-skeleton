/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   HppClassFiller.ts                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ldedier <ldedier@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/07/10 07:37:22 by ldedier           #+#    #+#             */
/*   Updated: 2019/07/12 10:16:12 by ldedier          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import * as vscode from 'vscode';

class HppClassFiller
{
	public document: vscode.TextDocument;
	public className: string;
	public defineString: string;
	public basename: string;
	public publicMethodsPrototypes: string[];
	public privateMethodsPrototypes: string[];
	public functionsPrototypes: string[];
	public includes: string[];
	public placeHolder: string;

	public static defaultPlaceHolder: string = "** constructor parameters **";
	
	public static getPlaceHolder(): string
	{
		return vscode.workspace.getConfiguration().get('hpp-skeleton.placeHolder') as string
			|| HppClassFiller.defaultPlaceHolder;
	}

	public static getIncludes(): string[]
	{
		return vscode.workspace.getConfiguration().get('hpp-skeleton.includes') as string[];
	}

	public static getPublicMethods(): string[]
	{
		return vscode.workspace.getConfiguration().get('hpp-skeleton.publicMethods') as string[];
	}

	public static getPrivateMethods(): string[]
	{
		return vscode.workspace.getConfiguration().get('hpp-skeleton.privateMethods') as string[];
	}

	public static getFunctions(): string[]
	{
		return vscode.workspace.getConfiguration().get('hpp-skeleton.functions') as string[];
	}

	public translateHPPExtension(functions: string [])
	{
		return functions.map(x => x.replace(/\$PLACEHOLDER/g, this.placeHolder)
		.replace(/\$CLASSNAME/g, this.className));
	}

	constructor(document: vscode.TextDocument)
	{
		this.document = document;
		this.basename = (this.document.fileName.split("/").pop() as string);
		this.defineString = this.basename.toUpperCase().replace(/\./g, "_");
		this.className = this.basename.split(".")[0];
		this.placeHolder = HppClassFiller.getPlaceHolder();
		this.publicMethodsPrototypes = this.translateHPPExtension(HppClassFiller.getPublicMethods());
		this.privateMethodsPrototypes = this.translateHPPExtension(HppClassFiller.getPrivateMethods());	
		this.functionsPrototypes = this.translateHPPExtension(HppClassFiller.getFunctions());
		this.includes = this.translateHPPExtension(HppClassFiller.getIncludes());
	}
}
export default HppClassFiller;