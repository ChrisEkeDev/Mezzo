import React from 'react';
import Scroll from '../../components/Shared/Layout/Scroll';
import TextInput from '../../components/Shared/Inputs/TextInput'
import Button from '../../components/Shared/Buttons/Button';
import { useApp } from '../../Context/AppContext';
import useSongForm from '../../Hooks/useSongForm';
import Select from '../../components/Shared/Inputs/Select';
import { GenreOptions } from '../../Constants';
import MediaInput from '../../components/Shared/Inputs/MediaInput';
import * as ROUTES from '../../Constants/routes';
import { Link } from 'react-router-dom';

function CreateSong() {
    const { navigate } = useApp();
    const { formData, handleInput, errors, onCreateSong } = useSongForm();
    const { name, details, genre, file } = formData;

    return (
        <div className='wrapper'>
            <header className='header'>
                <span className='label'>Create New Song</span>
            </header>
            <section >
                <Scroll>
                    <form className='form--wrapper page_form--wrapper'>
                        <div>
                            <header className='form--header'>
                                <span className='flex-row'>
                                    <h1 className='form--title'>Create a new Song</h1>
                                </span>
                                <p className='tint sm'>
                                    This is your space to add new songs and expand your
                                    musical horizons.<br/>
                                    <Link
                                        to={ROUTES.NEW_ARTIST}
                                        className="sm"
                                    >
                                        Want to create a new artist instead?
                                    </Link>
                                </p>
                            </header>
                            <div className='form--inputs'>
                                <Select
                                    name="artist"
                                    label="Song Artist"
                                    setValue={handleInput}
                                    options={{DEFAULT:{id: 1,value: '', label: 'Select an option'}}}
                                />
                                <TextInput
                                    label="Song Name"
                                    name='name'
                                    value={name}
                                    setValue={handleInput}
                                    error={errors.name}
                                    styles=""
                                />
                                <TextInput
                                    label="Song Details"
                                    name='details'
                                    value={details}
                                    setValue={handleInput}
                                    error={errors.details}
                                    type="textarea"
                                />
                                <Select
                                    name="genre"
                                    label="Song Genre"
                                    options={GenreOptions}
                                    setValue={handleInput}
                                />
                                <MediaInput
                                    label="Song File"
                                    name="file"
                                    value={file}
                                    placeholder="Select a song"
                                    accept=".mp3,audio/mpeg"
                                    setValue={handleInput}
                                    error={errors.file}
                                />
                            </div>
                        </div>
                        <div className='form--actions'>
                            <Button
                                label="Create Song"
                                styles="secondary form--button"
                                action={onCreateSong}
                            />
                            <Button
                                label="Save Song & Add Another"
                                styles="primary form--button"
                                action={() => navigate(ROUTES.NEW_ARTIST)}
                            />
                        </div>
                    </form>
                </Scroll>
            </section>
        </div>
    )
}

export default CreateSong
