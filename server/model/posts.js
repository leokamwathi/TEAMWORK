// Handels Articles and gifs.
 
const posts = [
    {'posts':[
        {
            'id' : 1,
            'createdOn' : '07-05-2019',
            'title' : 'Happy Sunday',
            'post' : 'Today will be a fantastic day.',
            'isGif': 'false',
            'authorId' : 2,
        }, {
            'id' : 2,
            'createdOn': '07-05-2019',
            'title' : 'Cats',
            'post': 'https://picsum.photos/300',
            'isGif':'true',
            'authorId' : 3,
        }, {
            'id' : 3,
            'createdOn': '07-05-2019',
            'title' : 'Always Keep tring.',
            'post' : 'I am alive today because I never gaveup yestarday.',
            'isGif': 'false',
            'authorId' : 3,
        },
    ]}
];

module.exports = posts;


/*

// Handels Articles and gifs.

const posts = [
    {
'data': [
    {
        'id' : 1,
        'createdOn' : '07-05-2019',
        'title' : 'Happy Sunday',
        'post' : 'Today will be a fantastic day.',
        'isGif': 'false',
        'authorId' : 2,
        'comments':[
            {
                'id': 1,
                'postID':1,
                'createdOn': '07-05-2019',
                'comment': 'This is a comment.',
                'isGif': 'false',
                'authorId': 2,
            },
            {
                'id': 2,
                'postID': 1,
                'createdOn': '07-05-2019',
                'comment': 'This is a second comment.',
                'isGif': 'false',
                'authorId': 2,
            }]
}, {
        'id' : 2,
        'createdOn': '07-05-2019',
        'title' : 'Cats',
        'post': 'https://picsum.photos/300',
        'isGif':'true',
        'authorId' : 3,
        'comments': [
            {
                'id': 1,
                'postID': 2,
                'createdOn': '07-05-2019',
                'comment': 'This is a comment for post 2.',
                'isGif': 'false',
                'authorId': 1,
            },
            {
                'id': 2,
                'postID': 3,
                'createdOn': '07-05-2019',
                'comment': 'This is a second comment for post 2.',
                'isGif': 'false',
                'authorId': 2,
            }]
}, {
        'id' : 3,
        'createdOn': '07-05-2019',
        'title' : 'Always Keep tring.',
        'post' : 'I am alive today because I never gaveup yestarday.',
        'isGif': 'false',
    'authorId' : 3,
},
]
}];

module.exports = posts;

*/