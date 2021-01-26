const { Octokit } = require("@octokit/rest");

let apiData: any;

export default function getAPI() {

  const octokit = new Octokit({
    auth: "0acfb7a6a3c3b0f4891e6fb997a8e095ae97a32f",
  });

  octokit.repos

    .listForOrg({
      org: "silverorange",
      type: "public",
    })

    .then(({ data } : {data: any}) => {
      data = data.filter((repo: {fork: boolean;}) => repo.fork === false)
      apiData = data
      return data;
    });

}

module.exports = apiData;
