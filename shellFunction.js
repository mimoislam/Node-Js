var shellExec = require('shelljs');
var status_TYPE=require("./Status");
var status=require('./app');
var createRepo = require( '@moyuyc/github-create-repo' );
var request = require('request');
const git = require('simple-git')()
const fs = require('fs');
const { jsonp } = require('express/lib/response');






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


async function shell(users){
	let j = 0;
	groupe_name="linux01"

	while (j < users.length) {
		var firstData=users[j];
		data=[];

		github = firstData.githubUrl;
		auditServer = firstData.auditServer_id;
	let i = 0;
	while (i <Object.keys(firstData.data).length) {
	
data.push({
	ip:(firstData.data)[i].ip,
	 user:(firstData.data)[i].user,
	 password:(firstData.data)[i].password,
	 privilege:(firstData.data)[i].privilege,
	 become_user:(firstData.data)[i].become_user,
	 become_password:(firstData.data)[i].become_password,
});
	i++;

}
 
console.log('data1');

	console.log(data);
    // gitClone(github);


	try {
	 await  fs.writeFile('hosts', createHostFile(data,groupe_name)
	 ,(err) => {
		if (err)
			throw err;
			
		console.log('File saved!');

		status.status=status_TYPE.OCCUPIED
		  shellExec.exec('ansible-playbook -i hosts  AnsiblePlayBook/playBook.yaml');

		console.log("finished");
		status.status=status_TYPE.LIBRE
		const fs = require('fs');

 fs.readFile('AnsiblePlayBook/config.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  
  request({
    url: "http://127.0.0.1:8000/admin/test",
    method: "POST",
    json: true,   // <--Very important!!!
    body: data
}, function (error, response, body){
	console.log('body.data');

    console.log(body);
});
//   request.post(
//     'http://www.yoursite.com/formpage',
//     { json: { key: 'value' },data:{
// 		result:data,
// 		"auditServer_id":auditServer
// 	} },

//     function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             console.log(body);
//         }
//     }
// );
  console.log(data);
  console.log(auditServer);
});
	}
	)	  // file written successfully
	} catch (err) {
	  console.error(err);
	}


	j++;

}
    
    
}

/*ansible-playbook -i ../../../hosts playbook.yml*/
module.exports.shell= shell