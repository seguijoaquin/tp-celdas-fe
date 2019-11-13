var express = require("express");
var router = express.Router();

const Web3 = require('web3')

var utils = require('../utils/utils')

const provider = `http://localhost:7545`

// Web3
const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")

let account = null;

const getAccount = async () => {
    result = await web3.eth.getAccounts();
    return result[0]
}

const destinationWalletAddress = `0x149BfEE56893ae72DBc16CdC5B8Bc15970614b9F`

var contract = new web3.eth.Contract(utils.getABI(), destinationWalletAddress, {
    gasLimit: "3000000"
})

router.get("/", function(req, res, next) {
    res.send("API is working properly");
});

router.get("/projects", async function(req, res, next) {
    var count = await contract.methods.projectCount().call();

    var projects = []
    for (let index = 0; index < count; index++) {
        const p = await contract.methods.projects(index).call();
        state = p.state == 0 ? 'CLOSED' : p.state == 1 ? 'OPEN' : 'CANCELED'
        created = new Date(p.creationDate * 1000).toLocaleDateString()
        ends = new Date(p.endDate * 1000).toLocaleDateString()
        projects.push({name: p.name, ammount: p.amount, creationDate: created, endDate: ends, state: state, ammountContributed: p.amountContributed})
    }

    res.send({data: projects})
});

router.get("/contribute/:id/:value", async function(req, res, next) {
    var account = await getAccount()
    var result = await contract.methods.contribute(req.params.id).send({from: account, value:req.params.value});
    res.send("OK")
});

router.get("/verify/:id", async function(req, res, next) {
    var account = await getAccount()
    var result = await contract.methods.auditProject(req.params.id).send({from: account});
    res.send("Verification OK")
});

router.get("/project/:name/:amount/:days", async function(req, res, next) {
    var account = await getAccount()
    var result = await contract.methods.createProject(req.params.name, req.params.amount, req.params.days).send({from: account});
    res.send("Created")
});



module.exports = router;