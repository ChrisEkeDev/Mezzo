import React from 'react';
import Scroll from '../../components/Shared/Layout/Scroll';
import useArtistForm from '../../Hooks/useArtistForm';
import MediaInput from '../../components/Shared/Inputs/MediaInput';
import TextInput from '../../components/Shared/Inputs/TextInput';
import Button from '../../components/Shared/Buttons/Button';
import { useApp } from '../../Context/AppContext';
import * as ROUTES from '../../Constants/routes';
import { Link } from 'react-router-dom';

function CreateArtist() {
    const { navigate } = useApp();
    const { formData, handleInput, errors, onCreateArtist } = useArtistForm()
    const { name, bio, image } = formData;

    return (
        <div className='wrapper'>
            <header className='header'>
                <span className='label'>Create New Artist</span>
            </header>
            <section>
                <Scroll>
                <form className='form--wrapper page_form--wrapper'>
                        <div>
                            <header className='form--header'>
                                <span className='flex-row'>
                                    <h1 className='form--title'>Create a new Artist</h1>
                                </span>
                                <p className='tint sm'>
                                    This is your first step towards building
                                    your personalized music universe.<br/>
                                    <Link
                                    to={ROUTES.NEW_SONG}
                                    className="sm"
                                    >
                                        Want to create a new song instead?
                                    </Link>
                                </p>
                            </header>
                            <div className='form--inputs'>
                                <TextInput
                                    label="Artist Name"
                                    name='name'
                                    value={name}
                                    setValue={handleInput}
                                    error={errors.name}
                                    styles=""
                                />
                                <TextInput
                                    label="Artist Bio"
                                    name='bio'
                                    value={bio}
                                    setValue={handleInput}
                                    error={errors.bio}
                                    type="textarea"
                                />
                                <MediaInput
                                    label="Artist Image"
                                    name="image"
                                    value={image}
                                    placeholder="Select an image"
                                    accept="image/*"
                                    setValue={handleInput}
                                    error={errors.file}
                                />
                            </div>
                        </div>
                        <div className='form--actions'>
                            <Button
                                label="Save Artist & Finish"
                                styles="secondary form--button"
                                action={onCreateArtist}
                            />
                            <Button
                                label="Save Artist & Continue"
                                styles="primary form--button"
                                action={() => navigate(ROUTES.NEW_SONG)}
                            />
                        </div>
                    </form>
                </Scroll>
            </section>
        </div>
    )
}

export default CreateArtist
