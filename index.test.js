const request = require("supertest");
const app   =  require("./index.js").serverExport();

jest.setTimeout(12000000);
describe(" ======================== Blog Test ===========================",  () => {
    var id = '';
    it('GET /blog ----> Arrays with objects ===(HAPPY PART)===',  async () => {
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
    it('POST /api/v1/blog/create ---> without token ===(SAD PART)===', async () => {
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
    it('POST /api/v1/blog/create ---> with token ===(HAPPY PART)===', async () => {
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
                id = response.id;    
            });
    });
    it(`GET /blog/find/blogId  ---> Object ===(HAPPY PART)===`, async () => {
        return await request(app)
            .get(`/api/v1/blog/find?blogId=61e65fe8d166e403df0559f1`)
            .expect('Content-Type',/json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({                        
                        "message": expect.any(String),
                        "data": expect.arrayContaining([
                            expect.any(Object)
                        ])                     
                    })
                 );  
            })           
    });
    it('PUT /blog ---> Object blogs ===(HAPPY PART)===', async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWUxOTAyYWVkYjJkODM5NDUzMzRmMTYiLCJpYXQiOjE2NDIyNDU0MjN9.RIRkq6kwdsAxRZW10sscZsbYKOAVuQXfrV6Ys_7oF60";
        return await request(app)
            .put('/api/v1/blog/update')
            .set({ 'auth-token': token, Accept: 'application/json' })
            .send({
                "_id": "61e65fe8d166e403df0559f1",
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
    it('DELETE /blog  ---> Not found ===(SAD PART)===', async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWUxOTAyYWVkYjJkODM5NDUzMzRmMTYiLCJpYXQiOjE2NDIyNDU0MjN9.RIRkq6kwdsAxRZW10sscZsbYKOAVuQXfrV6Ys_7oF60";
        return await request(app)
            .delete(`/api/v1/blog/delete?blogId=61e134c7481b811737ea17bf`)
            .set({ 'auth-token': token, Accept: 'application/json' })         
            .expect(404)
            .then((res) => {
                expect(res.body).toEqual(expect.objectContaining({
                    "error" : expect.any(String)
                }))
            });
    });
    it('DELETE /blog  ---> found  ===(HAPPY PART)===', async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWUxOTAyYWVkYjJkODM5NDUzMzRmMTYiLCJpYXQiOjE2NDIyNDU0MjN9.RIRkq6kwdsAxRZW10sscZsbYKOAVuQXfrV6Ys_7oF60";
        return await request(app)
            .delete(`/api/v1/blog/delete?blogId=61e661debca08a2c864882e9`)
            .set({ 'auth-token': token, Accept: 'application/json' })         
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(expect.objectContaining({
                    "message" : expect.any(String)
                }))
            });
    });
})

describe(" ======================== Commenting api Test=========================== \n \n ",  () => {
    it('GET /comments ----> Arrays of objects',  async () => {
        return await request(app)
            .get('/api/v1/comment?limit=2&q=61e65fe8d166e403df0559f1')
            .expect('Content-Type',/json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining(
                        {
                            "data": expect.any(Array)
                        }
                    ));
                });
       
    });
    it('Post /comment ----> ',  async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWUxOTAyYWVkYjJkODM5NDUzMzRmMTYiLCJpYXQiOjE2NDIyNDU0MjN9.RIRkq6kwdsAxRZW10sscZsbYKOAVuQXfrV6Ys_7oF60";
        return await request(app)
            .post('/api/v1/comment/create')
            .set({ 'auth-token': token, Accept: 'application/json' })
            .send({
                "comment" : "Hello",
                "blogId" : "61e65fe8d166e403df0559f1"
            })
            .expect('Content-Type',/json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining(
                        {
                            "data": expect.any(Object)
                        }
                    ));
                });
       
    });
})

describe(" ======================== Contacting api Test=========================== \n \n ",  () => {
    it('GET /contacting ----> Arrays of objects  ===(HAPPY PART)===',  async () => {
        return await request(app)
            .get('/api/v1/contact')
            .expect('Content-Type',/json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining(
                        {
                            "data": expect.any(Array)
                        }
                    ));
                });
       
    });
    it('Post /Contacting ----> ===(HAPPY PART)===',  async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWUxOTAyYWVkYjJkODM5NDUzMzRmMTYiLCJpYXQiOjE2NDIyNDU0MjN9.RIRkq6kwdsAxRZW10sscZsbYKOAVuQXfrV6Ys_7oF60";
        return await request(app)
            .post('/api/v1/contact/send')
            .set({ 'auth-token': token, Accept: 'application/json' })
            .send({
                "comment" : "Hello",
                "email" : "sezeranochrisostom123@gmail.com",
                "subject" : "Just testing"
            })
            .expect('Content-Type',/json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining(
                        {
                            "data": expect.any(Object)
                        }
                    ));
                });
       
    });
})