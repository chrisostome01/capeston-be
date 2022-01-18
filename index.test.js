const { response } = require("express");
const request = require("supertest");
const app   =  require("./index.js").serverExport();

jest.setTimeout(12000000);
describe("Blogs crud",  () => {
    it('GET /blog ----> Arrays with objects',  async () => {
        return await request(app)
            .get('/api/v1/blog?limit=1')
            .expect('Content-Type',/json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            "_id": expect.any(String),
                            "creatorId": expect.any(String),
                            "Subtitle": expect.any(String),
                            "Title": expect.any(String),
                            "dateCreated": expect.any(String),
                            "info":  expect.any(String),
                            "__v": 0
                        })
                    ]));
                });
       
    });
    it('GET /blog/find/blogId  ---> arrays blogs', async () => {
        return await request(app)
            .get('/api/v1/blog/find?blogId=61e16683d8fbe7da4d14e17e')
            .expect('Content-Type',/json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            "_id": expect.any(String),
                            "creatorId": expect.any(String),
                            "Subtitle": expect.any(String),
                            "Title": expect.any(String),
                            "dateCreated": expect.any(String),
                            "info":  expect.any(String),
                            "__v": 0
                        })
                    ]));
                });        
    });
    it('POST /api/v1/blog/create ---> without token', async () => {
        return await request(app)
            .post('/api/v1/blog/create')
            .expect('Content-Type',/json/)
            .expect(401)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        "error": expect.any(String)
                    }));             
                });        
    });
    it('POST /api/v1/blog/create ---> with token', async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWUxOTAyYWVkYjJkODM5NDUzMzRmMTYiLCJpYXQiOjE2NDIyNDU0MjN9.RIRkq6kwdsAxRZW10sscZsbYKOAVuQXfrV6Ys_7oF60";
        return await request(app)
            .post('/api/v1/blog/create')
            .set({ 'auth-token': token, Accept: 'application/json' })
            .send({
                    "creatorId": "owfop0i2FMX2Bm1byYxgxg0hcFk2",
                    "Subtitle": "New blog",
                    "Title": "ATLP",
                    "dateCreated": "2021-12-22 15:36:5",
                    "Description": "Description",
                    "postBanner": "https://firebasestorage.googleapis.com/v0/b/capstone-d17ab.appspot.com/o/images%2F-MrXLmF2zy91kylH0bYi%2FDigital-Signature_Feature%20(2).png?alt=media&token=b9dcf422-d97e-4849-96a0-95a2ddb35a6f"
                })            
            .expect('Content-Type',/json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        "data": expect.any(Object)
                    }));  
            });
    });
    it('PUT /blog ---> Object blogs', async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWUxOTAyYWVkYjJkODM5NDUzMzRmMTYiLCJpYXQiOjE2NDIyNDU0MjN9.RIRkq6kwdsAxRZW10sscZsbYKOAVuQXfrV6Ys_7oF60";
        return await request(app)
            .put('/api/v1/blog/update')
            .set({ 'auth-token': token, Accept: 'application/json' })
            .send({
                "_id": "61e16683d8fbe7da4d14e17e",
               "Subtitle": "Update blog",
               "Title": "ATLP"
             })            
            .expect('Content-Type',/json/)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(expect.objectContaining({
                    "data" : expect.any(String),
                    "message": expect.any(String)
                }))
            });
    });
    it('delete /blog  ---> Not found', async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWUxOTAyYWVkYjJkODM5NDUzMzRmMTYiLCJpYXQiOjE2NDIyNDU0MjN9.RIRkq6kwdsAxRZW10sscZsbYKOAVuQXfrV6Ys_7oF60";
        return await request(app)
            .delete('/api/v1/blog/delete?blogId=61e134c7481b811737ea17bf')
            .set({ 'auth-token': token, Accept: 'application/json' })         
            .expect(404)
            .then((res) => {
                expect(res.body).toEqual(expect.objectContaining({
                    "error" : expect.any(String)
                }))
            });
    });
    it('delete /blog  ---> found', async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWUxOTAyYWVkYjJkODM5NDUzMzRmMTYiLCJpYXQiOjE2NDIyNDU0MjN9.RIRkq6kwdsAxRZW10sscZsbYKOAVuQXfrV6Ys_7oF60";
        return await request(app)
            .delete('/api/v1/blog/delete?blogId=61e2ad43a1077e92dfa0b879')
            .set({ 'auth-token': token, Accept: 'application/json' })         
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(expect.objectContaining({
                    "success" : expect.any(String)
                }))
            });
    });
    
})
