const request = require("supertest");
const app   =  require("./index.js").serverExport();

jest.setTimeout(12000000);
describe(" ======================== BLOGs API TEST =========================== \n \n",  () => {
    var id = '';
    it('GET /blogs ----> Arrays with objects ===(HAPPY PART)===',  async () => {
        return await request(app)
            .get('/api/v1/blogs?limit=1')
            .expect('Content-Type',/json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        "status": expect.any(String),
                        "data": expect.arrayContaining([ expect.any(Object) ]),
                        "message": expect.any(String),
                    }));
                });
       
    });
    
    it('POST /api/v1/blogs/create ---> without token ===(SAD PART)===', async () => {
        return await request(app)
            .post('/api/v1/blogs/create')
            .expect('Content-Type',/json/)
            .expect(401)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        "status": expect.any(String)
                    }));             
                });        
    });
    it('POST /api/v1/blogs/create ---> with token ===(HAPPY PART)===', async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWUxOTAyYWVkYjJkODM5NDUzMzRmMTYiLCJpYXQiOjE2NDIyNDU0MjN9.RIRkq6kwdsAxRZW10sscZsbYKOAVuQXfrV6Ys_7oF60";
        return await request(app)
            .post('/api/v1/blogs/create')
            .set({ 'auth-token': token, Accept: 'application/json' })
            .send({
                "Subtitle": "New blogs",
                "Title": "ATLP",
                "dateCreated": "2021-12-22 15:36:5",
                "Description": "Description",
                "postBanner": "https://firebasestorage.googleapis.com/v0/b/capstone-d17ab.appspot.com/o/images%2F-MrXLmF2zy91kylH0bYi%2FDigital-Signature_Feature%20(2).png?alt=media&token=b9dcf422-d97e-4849-96a0-95a2ddb35a6f"
            })            
            .expect('Content-Type',/json/)
            .expect(201)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        "data": expect.any(Object)
                    }));  
                id = response.body._id;    
            });
    });
    it(`GET /blogs/find/blogId  ---> Object ===(HAPPY PART)===`, async () => {
        return await request(app)
            .get(`/api/v1/blogs/find?blogId=61e664498b6860635d9d8c20`)
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
    it('PUT /blogs ---> Object blogs ===(HAPPY PART)===', async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWUxOTAyYWVkYjJkODM5NDUzMzRmMTYiLCJpYXQiOjE2NDIyNDU0MjN9.RIRkq6kwdsAxRZW10sscZsbYKOAVuQXfrV6Ys_7oF60";
        return await request(app)
            .put('/api/v1/blogs/update/61e664498b6860635d9d8c20')
            .set({ 'auth-token': token, Accept: 'application/json' })
            .send({
               "Subtitle": "Update blogs",
               "Title": "ATLP"
             })            
            .expect('Content-Type',/json/)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        "data" : expect.any(Object),
                        "message": expect.any(String)
                    })
                )
            });
    });
    
    it('DELETE /blogs  ---> found  ===(HAPPY PART)===', async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWUxOTAyYWVkYjJkODM5NDUzMzRmMTYiLCJpYXQiOjE2NDIyNDU0MjN9.RIRkq6kwdsAxRZW10sscZsbYKOAVuQXfrV6Ys_7oF60";
        return await request(app)
            .delete(`/api/v1/blogs/delete/61f100bdc77cdea2d0382493`)
            .set({ 'auth-token': token, Accept: 'application/json' })         
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(expect.objectContaining({
                    "message" : expect.any(String)
                }))
            });
    });
    it('DELETE /blogs  ---> Not found ===(SAD PART)===', async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWUxOTAyYWVkYjJkODM5NDUzMzRmMTYiLCJpYXQiOjE2NDIyNDU0MjN9.RIRkq6kwdsAxRZW10sscZsbYKOAVuQXfrV6Ys_7oF60";
        return await request(app)
            .delete(`/api/v1/blogs/delete/61f100bdc77cdea2d0382493`)
            .set({ 'auth-token': token, Accept: 'application/json' })         
            .expect(404)
            .then((res) => {
                expect(res.body).toEqual(
                expect.objectContaining({
                    "status" : expect.any(String)
                }))
            });
    });
    
})

describe(" ======================== COMMENTING API TEST =========================== \n \n ",  () => {
    it('GET /comments ----> Arrays of objects',  async () => {
        return await request(app)
            .get('/api/v1/comments?limit=2&q=61e65fe8d166e403df0559f1')
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
            .post('/api/v1/comments/create')
            .set({ 'auth-token': token, Accept: 'application/json' })
            .send({
                "comment" : "Hello",
                "blogId" : "61e663cbba8ba1e083cdc4e9"
            })
            .expect('Content-Type',/json/)
            .expect(201)
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

describe(" ======================== CONTACTING API TEST =========================== \n \n ",  () => {
    it('GET /contacting ----> Arrays of objects  ===(HAPPY PART)===',  async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWUxOTAyYWVkYjJkODM5NDUzMzRmMTYiLCJpYXQiOjE2NDI2NzM3NTJ9.pKlbBorUXkjaGRQUidYjNOMJGGithMiTxKTUzz8p1LU";
        
        return await request(app)
            .get('/api/v1/contacts')
            .set({ 'auth-token': token, Accept: 'application/json' })
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
    it('Post /Contacting  ===(HAPPY PART)===',  async () => {
        return await request(app)
            .post('/api/v1/contacts/send')
            .send({
                "comment" : "New contscts",
                "email" : "sezeranochrisostom123@gmail.com",
                "subject" : "Just testing"
            })
            .expect('Content-Type',/json/)
            .expect(201)
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

describe(" \n \n  ================================ AUTH API TEST ================================ \n \n ",  () => {
    it('GET /Users  === (SAD PART) === WITHOUT  ADMINTOKEN',  async () => {
         return await request(app)
            .get('/api/v1/user')
            .expect('Content-Type',/json/)
            .expect(401)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining(
                        {
                            "status": expect.any(String)
                        }
                    ));
                });
       
    });
    it('GET /Users  === (HAPPY PART) === WITH ADMINTOKEN',  async () => {
        const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWUxOTAyYWVkYjJkODM5NDUzMzRmMTYiLCJpYXQiOjE2NDI2NzM3NTJ9.pKlbBorUXkjaGRQUidYjNOMJGGithMiTxKTUzz8p1LU";
        
        return await request(app)
            .get('/api/v1/user')
            .set({ 'auth-token': adminToken, Accept: 'application/json' })
            .expect('Content-Type',/json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining(
                        {
                            "status": expect.any(String),
                            "data": expect.any(Array)
                        }
                    ));
                });
       
    });
    it('POST /login  ===(SAD PART)=== WITH WRONG CREDENTIALS',  async () => {
        return await request(app)
            .post('/api/v1/user/login')
            .send({
                "Email" : "sezeranochrisostom123@gmail.com",
                "Password" : "12345askdjfbaksdu"
            })
            .expect('Content-Type',/json/)
            .expect(401)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining(
                        {
                            "status": expect.any(String)
                        }
                    ));
                });
       
    });
    it('POST /login  ===(HAPPY PART)=== WITH VALID CREDENTIALS',  async () => {
        return await request(app)
            .post('/api/v1/user/login')
            .send({
                "Email" : "sezeranochrisostom123@gmail.com",
                "Password" : "123456789"
            })
            .expect('Content-Type',/json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining(
                        {
                            "data": expect.any(Object),
                            "message": expect.any(String)
                        }
                    ));
                });
       
    });
    it('POST /register  ===(SAD PART)=== WITH USED EMAIL',  async () => {
        return await request(app)
            .post('/api/v1/user/register')
            .send({
                "Email" : "sezeranochrisostom123@gmail.com",
                "Password" : "345379990"
            })
            .expect('Content-Type',/json/)
            .expect(400)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining(
                        {
                            "status": expect.any(String)
                        }
                    ));
                });
       
    });
    it('POST /register  ===(SAD PART)=== WITH NEW EMAIL',  async () => {
        return await request(app)
            .post('/api/v1/user/register')
            .send({
                "Email" : "jhhodoe1235678911@gmail.com",
                "password" : "123456789",
                "Username" : "Jhondoe1234",
                "Fullname": "Jean done"
            })
            .expect('Content-Type',/json/)
            .expect(201)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining(
                        {
                            "data": expect.any(Object)
                        }
                    ));
                });
       
    });    
    it('PUT /USER =====(HAPPY PART)===== UPDATING WITHOUT USER TOKEN',  async () => {
        return await request(app)
            .put('/api/v1/user/update')
            .send({
                "Username" : "titoNewName"
            })
            .expect('Content-Type',/json/)
            .expect(401)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining(
                        {
                            "status": expect.any(String)
                        }
                    ));
                });
       
    });
    it('PUT /USER =====(HAPPY PART)===== UPDATING WITH USER TOKEN',  async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWUxOTAyYWVkYjJkODM5NDUzMzRmMTYiLCJpYXQiOjE2NDIyNDU0MjN9.RIRkq6kwdsAxRZW10sscZsbYKOAVuQXfrV6Ys_7oF60";
        return await request(app)
            .put('/api/v1/user/update')
            .set({ 'auth-token': token, Accept: 'application/json' })
            .send({
                "Username" : "titoNewName"
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
    it('PUT /USER =====(HAPPY PART)===== UPDATING WITH TOKEN BUT WITH UNEDITABLE KEY ELEMENT',  async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWUxOTAyYWVkYjJkODM5NDUzMzRmMTYiLCJpYXQiOjE2NDIyNDU0MjN9.RIRkq6kwdsAxRZW10sscZsbYKOAVuQXfrV6Ys_7oF60";
        return await request(app)
            .put('/api/v1/user/update')
            .set({ 'auth-token': token, Accept: 'application/json' })
            .send({
                "userType" : "newType"
            })
            .expect('Content-Type',/json/)
            .expect(400)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining(
                        {
                            "status": expect.any(String)
                        }
                    ));
                });
       
    });
    it('GET /USER =====(HAPPY PART)===== FIND USER BY USERNAME',  async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWUxOTAyYWVkYjJkODM5NDUzMzRmMTYiLCJpYXQiOjE2NDIyNDU0MjN9.RIRkq6kwdsAxRZW10sscZsbYKOAVuQXfrV6Ys_7oF60";
        return await request(app)
            .get('/api/v1/user/find?username=titoNewName')
            .set({ 'auth-token': token, Accept: 'application/json' })
            .expect('Content-Type',/json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining(
                        {
                            "message": expect.any(String),
                            "data": expect.any(Object)
                        }
                    ));
                });
       
    });
    it('GET /USER =====(SAD PART)===== FIND UNKNOW USERNAME',  async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWUxOTAyYWVkYjJkODM5NDUzMzRmMTYiLCJpYXQiOjE2NDIyNDU0MjN9.RIRkq6kwdsAxRZW10sscZsbYKOAVuQXfrV6Ys_7oF60";
        return await request(app)
            .get('/api/v1/user/find?username=ASDFW')
            .set({ 'auth-token': token, Accept: 'application/json' })
            .expect('Content-Type',/json/)
            .expect(404)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining(
                        {
                            "status": expect.any(String)
                        }
                    ));
                });
       
    });
    it('GET /USER =====(SAD PART)===== WITHOUT TOKEN',  async () => {
        return await request(app)
            .get('/api/v1/user/find?username=ASDFW')
            .expect('Content-Type',/json/)
            .expect(401)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining(
                        {
                            "status": expect.any(String)
                        }
                    ));
                });
       
    });
})