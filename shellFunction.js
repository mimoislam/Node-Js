var shellExec = require('shelljs');
var status_TYPE=require("./Status");
var status=require('./app');




async function shell(){
    status.status=status_TYPE.OCCUPIED
    shellExec.exec('ansible-playbook -i hosts  ./AnsiblePlayBook/ansible-playbooks/apache_ubuntu1804/playbook.yml');
    console.log("finished");
    //status.status=status_TYPE.LIBRE
    
}

/*ansible-playbook -i ../../../hosts playbook.yml*/
module.exports.shell= shell