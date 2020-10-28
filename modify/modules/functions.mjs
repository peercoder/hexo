export function getFileExt(filename) {
	return filename.split('.').pop();
}
export function getName(filename) {
	return filename.replace('.'+getFileExt(filename),'');
}
export function titleClean(str) {
	str = str.replace('/[^\[\]\(\)\-\"\'A-Za-z0-9\s\s+]/',' ');
	str = str.replace('/\s+/', ' ', str);
	str = str.trim(str);
	return str;
}