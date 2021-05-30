import React from 'react';
import './dashboard.css';
import * as req from '../backend/adminBackend';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles({
    formControl: {
        backgroundColor: 'rgb(255, 255, 255)',
        width: '20vw'
    }
});

function Section() {

    const [input,
        setInput] = React.useState({})
    const [filenu,
        setFilenu] = React.useState()
    const classes = useStyles()

    var imageData = []
    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    const handleFile = (event) => {

        for (var i = 0; i < event.target.files.length; i++) {
            imageData.push(event.target.files[i])
        }
        setFilenu(imageData)
    }

    async function submit() {
        console.log(input)
        const obj = {
            data: input,
            file: filenu
        }

        var result = await req.fetchAdmins(obj, 2)
        console.log(result)
    }

    return (
        <>
        <div className="section">
            <div className="secHeader">
                <div className="upload-books">
                    Upload Books
                </div>
                <div>
                    <input
                        onClick={() => submit()}
                        className="addBook"
                        type="button"
                        value="Add Book"/>
                </div>
            </div>
        
                <div className="midSec">
                    <div className="row x align-items-center">
                        <div className="inputText oneFlex">Title</div>
                        <div className="twoFlex">
                            <input
                                onChange={handleChange}
                                name="title"
                                placeholder="Book Title"
                                className="inputBook"/>
                        </div>
                    </div>
                    <div className="row x align-items-center">
                        
                        <div className="inputText oneFlex">Author</div>
                        <div className="threeFlex">
                            <input
                           
                                onChange={handleChange}
                                name="author"
                                placeholder="Book author"
                                className="inputBook alag"/>
                        </div>
                        
                        
                        <div               
                            className="inputText oneFlex">Co-Author</div>
                        <div className="threeFlex">
                            <input
                             
                                onChange={handleChange}
                                name="coAuthor"
                                placeholder="Book CoAuthor"
                                className="inputBook alag"/>
                        </div>
                        
                    </div>
                    <div className="row  x align-items-center">
                        <div className="inputText oneFlex">Publisher</div>
                        <div className="twoFlex">
                            <input
                                onChange={handleChange}
                                name="Publisher"
                                placeholder="Publisher"
                                className="inputBook"/>
                        </div>
                    </div>
                    <div className="row x align-items-center">
                        <div className=" inputText oneFlex">Categories</div>
                        <div className="twoFlex">
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel>Category</InputLabel>
                                <Select

                                    name="Categories"
                                    onChange={handleChange}>
                                    <MenuItem value={input}>
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={"Hadees"}>Hadees</MenuItem>
                                    <MenuItem value={"Seerat"}>Seerat</MenuItem>
                                    <MenuItem value={"Treekh"}>Treekh</MenuItem>
                                    <MenuItem value={"Sawaneh"}>Sawaneh</MenuItem>
                                    <MenuItem value={"Fiqah"}>Fiqah</MenuItem>
                                    <MenuItem value={"Tasawwuf"}>Tasawwuf</MenuItem>
                                    <MenuItem value={"Radd firqa w batila"}>Radd firqa w batila</MenuItem>
                                    <MenuItem value={"Bayanat wa khitabat"}>Bayanat wa khitabat</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <div className="row x align-items-center">
                        <div className="inputText oneFlex">Languages</div>
                        <div className="twoFlex">
                            <input
                                onChange={handleChange}
                                name="language"
                                placeholder="Language"
                                className="inputBook"/>
                        </div>
                    </div>

                    <div className="row  x align-items-center ">
                        <div className="inputText oneFlex">Pages</div>
                        <div className="threeFlex">
                            <input
                                onChange={handleChange}
                                name="Pages"
                                placeholder="Book Pages"
                                className="inputBook alag"/>
                        </div>
                        <div
                        
                            className="inputText oneFlex">Volumes</div>
                        <div className="threeFlex">
                            <input
                                onChange={handleChange}
                                name="Volumnes"
                                placeholder="Book Volume"
                                className="inputBook alag"/>
                        </div>
                    </div>
                    <div className="row x align-items-center ">
                        <div className="inputText oneFlex">Keywords</div>
                        <div className="twoFlex">
                            <input
                                onChange={handleChange}
                                name="keywords"
                                placeholder="Keywords"
                                className="inputBook"/>
                        </div>
                    </div>
                    <div className="row x align-items-center ">
                        <div className="inputText oneFlex">Image</div>
                        <div className="twoFlex">
                            <label>
                                <input
                                    onChange={handleFile}
                                    type="file"
                                    style={{
                                    display: 'none'
                                }}
                                    multiple
                                    accept="image/*"/>
                                <Button
                                    style={{
                                    marginTop: '10px'
                                }}
                                    variant="outlined"
                                    component="span">
                                    Choose Files
                                </Button>
                            </label>
                        </div>
                    </div>

                </div>
      
        </div>
        </>
    )
}

export default Section