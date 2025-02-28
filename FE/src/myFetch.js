export async function fetchJson(path, requestBody, { method = "POST", credentials = 'include', ...restOption} = {}){
  const requestOption = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
    credentials
  }
  for (const p in restOption) {
    requestOption[p] = restOption[p]
  }
  console.log(requestOption)
  const result = await fetch('http://localhost:4000' + path, requestOption)

  return result
}