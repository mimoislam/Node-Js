var shellExec = require('shelljs');
var status_TYPE=require("./Status");
var status=require('./app');
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





async function shell(gitUrl){
    gitClone(gitUrl)





    status.status=status_TYPE.OCCUPIED
    shellExec.exec('ansible-playbook -i hosts  ./AnsiblePlayBook/ansible-playbooks/apache_ubuntu1804/playbook.yml');
    console.log("finished");
    //status.status=status_TYPE.LIBRE
    
}

/*ansible-playbook -i ../../../hosts playbook.yml*/
module.exports.shell= shell