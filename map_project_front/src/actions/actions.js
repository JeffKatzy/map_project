import $ from 'jquery'

export function createUser(username, password) {
  $.ajax({
    url: "http://localhost:3000/users",
    type: "POST",
    data: JSON.stringify({auth: {username, password}}),
    contentType: "application/json; charset=utf-8",
    dataType: "json"
  })
  return {
    type: "CREATE_USER",
    payload: {username, password}
  }
}
