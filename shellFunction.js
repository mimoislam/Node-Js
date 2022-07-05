var shellExec = require('shelljs');
var status_TYPE=require("./Status");
var status=require('./app');
var createRepo = require( '@moyuyc/github-create-repo' );
const git = require('simple-git')()
const fs = require('fs');






var opts = {
	'token': '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'
};






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


async function shell(gitUrl,user){
	groupe_name="linux01"
	data=[{
		ip:'192.168.1.49',
		user:'kali',
		password:'kali',
		privilege:true,
		become_user:'root',
		become_password:'kali',
	}]
    //gitClone(gitUrl)


	try {
	 await  fs.writeFile('hosts', createHostFile(data,groupe_name),(err) => {
		if (err)
			throw err;
			
		console.log('File saved!');

		status.status=status_TYPE.OCCUPIED
		 shellExec.exec('ansible-playbook -i hosts  AnsiblePlayBook/playBook.yaml');
		console.log("finished");
		status.status=status_TYPE.LIBRE
	})	  // file written successfully
	} catch (err) {
	  console.error(err);
	}




    //
    
}

/*ansible-playbook -i ../../../hosts playbook.yml*/
module.exports.shell= shell