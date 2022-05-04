var shellExec = require('shelljs');

async function shell(){
    shellExec.exec('ansible-playbook -i hosts  ./AnsiblePlayBook/ansible-playbooks/apache_ubuntu1804/playbook.yml');
    console.log("finished");
}
/*ansible-playbook -i ../../../hosts playbook.yml*/
module.exports.shell= shell