global.consoleInfo = (message) => {
	console.log('\x1b[36m[INFO]\x1b[0m\t%s',message);
}

global.consoleError = (message) => {
	console.log('\x1b[31m[ERROR]\x1b[0m\t%s', message);
}

global.consoleWarning = (message) => {
	console.log('\x1b[33m[WARNING]\x1b[0m\t%s', message);
}

global.consoleSuccess = (message) => {
	console.log('\x1b[32m[SUCCESS]\x1b[0m\t%s', message);
}