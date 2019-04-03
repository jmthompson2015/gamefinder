const FetchUtilities = {};

// see https://dev.to/ycmjason/javascript-fetch-retry-upon-failure-3p6g
FetchUtilities.fetchRetry = (url, options, n) => {
  const myUrl = `https://cors-anywhere.herokuapp.com/${url}`;
  const myHeaders = new Headers({
    "x-requested-with": "fetch"
  });
  return fetch(myUrl, { mode: "cors", headers: myHeaders })
    .then(response => {
      if (response.ok) return response;
      throw Error(`Request rejected with status ${response.status}`);
    })
    .catch(error => {
      if (n === 1) throw error;
      return FetchUtilities.fetchRetry(url, options, n - 1);
    });
};

FetchUtilities.fetchRetryXml = (url, options, n) =>
  FetchUtilities.fetchRetry(url, options, n)
    .then(response => response.text())
    .then(responseText => new DOMParser().parseFromString(responseText, "application/xml"));

export default FetchUtilities;
