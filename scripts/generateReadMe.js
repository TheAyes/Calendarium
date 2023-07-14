import fs from 'fs';

const pathToReadme = '../README.md';

const generateSlug = (text) => {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-');
};

const generateTableOfContents = async () => {
	try {
		const readmeContent = await fs.promises.readFile(pathToReadme, 'utf-8');
		const headings = readmeContent.match(
			/^(?!#\s*Calendarium$)(?!##\s*Table of Contents$)(?!# Table of Content$)(#+)\s(.+)/gm
		);

		if (headings) {
			let tableOfContents = [];

			headings.forEach((heading) => {
				const level = heading.match(/#+/)[0].length;
				const title = heading.replace(/#+\s/, '');
				const slug = generateSlug(title);
				const indentedTitle = ''.padStart((level - 1) * 2, ' ') + `- [${title}](#${slug})`;
				tableOfContents.push(indentedTitle);
			});

			const toc = '<!-- TOC START -->\n\n' + tableOfContents.join('\n') + '\n\n<!-- TOC END -->';
			const updatedContent = readmeContent.replace(/<!-- TOC START -->[\s\S]*<!-- TOC END -->/, toc);

			await fs.promises.writeFile(pathToReadme, updatedContent);
			console.log('Table of contents generated successfully!');
		} else {
			console.log('No headings found in the README file.');
		}
	} catch (error) {
		console.error('An error occurred:', error);
	}
};

generateTableOfContents();
