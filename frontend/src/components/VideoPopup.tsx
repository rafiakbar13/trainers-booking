import Modal from 'react-modal'
import { VideoProps } from '../types/VideoPopup'
Modal.setAppElement("#root");


const Video = ({ isOpen, videoUrl, onClose }: VideoProps) => {

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg"
        >
            <div className="flex justify-end">
                <button className="text-gray-500 hover:text-gray-900" onClick={onClose}>
                    Close
                </button>
            </div>
            <div className="video-container w-2/3">
                <iframe
                    src={videoUrl}
                    title="video"
                    height={300}
                    width={400}
                    allowFullScreen
                    className='rounded-lg aspect-video'
                />
            </div>
        </Modal>
    )
}

export default Video