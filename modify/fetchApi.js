// jQuery
$.getScript('/modify/includes/functions.js', function()
{
    // script is now loaded and executed.
    // put your dependent JS here.

async function getTopFiles() {
    let url = 'http://173.212.197.221:8000/api/files?limit=5&offset=0&topFileId=19&extension=mp4&statusId=1&orderBy=id&order=ASC';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
	//debug
	//console.log(res);
}

async function renderTopFiles() {
    let topFiles = await getTopFiles();
    let html = '<table><tr>';
    topFiles.forEach(topFile => {
		let smallThumbUrl = 'https://' + topFile.serverDomainName + '/core/cache/plugins/mediaconverter/' + topFile.id + '/160x90_thumb.jpg';	
		let gridThumbUrl = 'https://' + topFile.serverDomainName + '/core/cache/plugins/mediaconverter/' + topFile.id + '/many-thumb.jpg';	
		let name = getName(topFile.originalFilename);
		let title = titleClean(name);	
		//name.replace('/[^\[\]\(\)\-\"\'A-Za-z0-9\s\s+]/',' ');
        let htmlSegment = `<td style="width: 180px; display: inline-block; border: none; padding: 0; text-align: center; margin: 0 5px 5px 0; vertical-align: top;">
			<table>
				<tr>
					<td style="border: none; padding: 0;">
						<div class="topFiles"> <img src="${smallThumbUrl}">
							<h2 class="kratos-entry-title-new" style="font-size: 14px;">${title}</h2> </div>
					</td>
				</tr>
			</table>
		</td>`;
        html += htmlSegment;
    });
	html += '</tr></table>';
    let features = document.querySelector('.features');
    features.innerHTML = html;
}

renderTopFiles();
});