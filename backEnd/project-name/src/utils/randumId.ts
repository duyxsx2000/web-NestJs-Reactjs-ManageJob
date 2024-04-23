export const randumId = (startId: string) => {
    let id = `${startId}`;
    const string = 'qwertyuiopasdfghjklzxcvbnm1234567890';

    for(var i = 1; i <= 5; i++) {
        const randomIndex = Math.floor(Math.random() * string.length);
        id += string[randomIndex];
    };
    
    return id
};

//  const newUser = async () => {
    
//     const id = randumId('Á')
//     try {
//         const oldId = await this.userModel.findOne({id: id});

//         if(oldId) {
//             return newUser()
//         };

//         return id
//     } catch (error) {
//         return null
//     }   
// };



