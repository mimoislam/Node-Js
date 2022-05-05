var createRepo = require( '@moyuyc/github-create-repo' );
const git = require('simple-git')()




var opts = {
	'token': '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'
};

function createRepositoryByName(name){
    createRepo( name, opts, clbk );

}


function clbk( error, repo, info ) {
	// Check for rate limit information...
	if ( info ) {
		console.error( 'Limit: %d', info.limit );
		console.error( 'Remaining: %d', info.remaining );
		console.error( 'Reset: %s', (new Date( info.reset*1000 )).toISOString() );
	}
	if ( error ) {
		throw new Error( error.message );
	}
	console.log( JSON.stringify( repo ) );
	// returns <repo_data>
}



async function gitClone(repoURL){
const localPath= './AnsiblePlayBook';
const  options = [];

const handlerFn = () => {
    console.log('DONE')
};

await git.clone(repoURL, localPath, options, handlerFn());
}



module.exports.createRepositoryByName=createRepositoryByName;
module.exports.gitClone=gitClone;