declare const IS_DEV_BUILD: boolean;

const appHost = IS_DEV_BUILD ? "http://localhost:49412" : "https://sc-admin.herokuapp.com";

export default {
  client_id: 'SCAdmin',
  token_endpoint: `${appHost}/connect/token`,
  scope: 'openid profile offline_access WebAPI roles',
  response_type: 'id_token token',
  userinfo_endpoint: `${appHost}/connect/userinfo`,
  end_session_endpoint: `${appHost}/connect/endsession`,
  wellknown: `${appHost}/.well-known/openid-configuration`
}