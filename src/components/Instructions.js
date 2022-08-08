import './instructions.css'
import logo from '../assets/socialTag.png'
import CancelIcon from '@mui/icons-material/Cancel';
export function Instructions({setShowInstructions}) {
    return(
        <div className="instructionsContainer small">
            <div className="logo">
                <img src={logo} alt="Social Tag Logo" />
            </div>
            <div className="instructions">
            <p> SocialTag is an experimental Web App created to practice using
            Mapbox. </p> 
            <p> It's as simple as <b>Double Clicking</b> to create a <b>Pin</b> in and leave a <b>reviews and ratings. </b></p>
            <p className="special-p"> Who doesn't love online reviews? </p>
            <p> To make your review stand out, use up to 140 characters.</p>

            </div>
            <CancelIcon className='instCancel' onClick={() => setShowInstructions(false)}/>
        </div>
    )
}