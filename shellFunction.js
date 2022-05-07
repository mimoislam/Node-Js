var shellExec = require('shelljs');
var status_TYPE=require("./Status");
var status=require('./app');
var createRepo = require( '@moyuyc/github-create-repo' );
const git = require('simple-git')()
const fs = require('fs');






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


function createHostFile(data,groupe_name){
	var content = "["+groupe_name+"]";

	data.forEach(function (element ){
		content=content+"\n";


		var ipAddr=element .ip;
		content=content+ipAddr+"  "

		var user=element .user;
		content=content+"ansible_user="+user+"  "



		var password=element .password;
		content=content+"ansible_password="+password+"  "

		var privilege=element.privilege;
		if(privilege){

			var become_user=element.become_user;
			content=content+"ansible_become_user="+become_user+"  "


			var become_password=element.become_password;
			content=content+"ansible_become_pass="+become_password+"  "


		}

		
		

	})
	return content;
}


async function shell(gitUrl){
	groupe_name="linux"
	data=[{
		ip:'192.168.1.44',
		user:'kali',
		password:'kali',
		privilege:true,
		become_user:'root',
		become_password:'kali',
	},{
		ip:'192.168.1.1',
		user:'kali2',
		password:'kali2',
		privilege:true,
		become_user:'root',
		become_password:'kali',
	}]
    //gitClone(gitUrl)


	try {
	  fs.writeFile('hosts', createHostFile(data,groupe_name),(err) => {
		if (err)
			throw err;
		console.log('File saved!');
	})	  // file written successfully
	} catch (err) {
	  console.error(err);
	}




    status.status=status_TYPE.OCCUPIED
    shellExec.exec('ansible-playbook -i hosts  ./AnsiblePlayBook/ansible-playbooks/apache_ubuntu1804/playbook.yml');
    console.log("finished");
    //status.status=status_TYPE.LIBRE
    
}

/*ansible-playbook -i ../../../hosts playbook.yml*/
module.exports.shell= shell