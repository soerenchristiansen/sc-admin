using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace sc_admin.tests
{
    public class HttpClientBase
    {
        private const string ApiUrl = "api/";
        public async Task<T> GetAsync<T>(string url)
        {
            using (var client = await MakeHttpClient())
            {
                var responseMessage = await client.GetAsync(ApiUrl + url);
                responseMessage.EnsureSuccessStatusCode();
                var jsonStringObject = await responseMessage.Content.ReadAsStringAsync();
                var deserialized = JsonConvert.DeserializeObject<T>(jsonStringObject);
                return deserialized;
            }
        }

        public async Task<T> PostAsync<T>(string url, T body)
        {
            using (var client = await MakeHttpClient())
            {
                var content = CreateJsonObjectContent(body);
                var responseMessage = await client.PostAsync(ApiUrl + url, content);
                var jsonString = await responseMessage.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<T>(jsonString);
            }

        }

        private StringContent CreateJsonObjectContent<T>(T body)
        {
            var json = JsonConvert.SerializeObject(body);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            return content;
        }

        private async Task<HttpClient> MakeHttpClient()
        {
            var httpClient = new HttpClient { BaseAddress = new Uri("http://localhost:49412/") };
            
            const string body = "grant_type=password&client_id=SCAdmin&scope=openid profile offline_access WebAPI roles&username=&password=";
            var json = JsonConvert.SerializeObject(body);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var responseMessage = await httpClient.PostAsync("connect/token", content);
            var jsonString = await responseMessage.Content.ReadAsStringAsync();
            var tokenResponse = JsonConvert.DeserializeObject<TokenResponse>(jsonString);

            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokenResponse.access_token);

            return httpClient;
        }

        public class TokenResponse
        {
            public string access_token { get; set; }
            public string refresh_token { get; set; }
            public string expires_in { get; set; }
        }
    }
}