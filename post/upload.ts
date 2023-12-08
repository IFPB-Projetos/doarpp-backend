import axios from 'axios';
import FormData from "form-data";
import fs from "fs"

export async function uploadImage(image:string | undefined){
    const form = new FormData()

    const file = fs.readFile(`./public/imgs/${image}`, function(err,data){
        if (!err) {
            console.log('received data: ' + data);
        } else {
            console.log(err);
        }
    })

    form.append("file", file);
    form.append("upload_preset", "newImage");

    const newImage = await axios.post(
        "https://api.cloudinary.com/v1_1/dk5auk46u/image/upload",
        form
    )

    return newImage.data;
}