import styled from 'styled-components';
import Popup from '../ui/ModalPopUp';
import { useEffect, useState } from 'react';
import {
  createPlaylist,
  deletePlaylists,
  updatePlaylist,
} from '../services/apiService';
import toast from 'react-hot-toast';
import { useAppContext } from '../contexts/AppContext';

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: white;
`;

const ModalBody = styled.div`
  display: flex;
  gap: 20px;
`;

const ImagePlaceholder = styled.div`
  width: 150px;
  height: 150px;
  background-color: #2c2c2c;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #b3b3b3;
  font-size: 40px;
  overflow: hidden;
  position: relative;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #333;
  background-color: #2c2c2c;
  color: white;
  font-size: 16px;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #333;
  background-color: #2c2c2c;
  color: white;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${({ disabled, variant }) => {
    if (disabled) return '#888';
    if (variant === 'red') return '#ff4d4d';
    if (variant === 'green') return '#1db954';
    return '#1db954'; // Default to green if no variant is provided
  }};
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 16px;
  margin: 20px 10px 0px 10px;
  align-self: flex-end;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const DisclaimerText = styled.p`
  font-size: 12px;
  color: #b3b3b3;
  margin-top: 20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
`;

function PlaylistModal({
  title = 'Create New Playlist',
  trigger,
  onPlaylistCreated,
  name,
  desc,
  img,
  id,
  canDelete = false,
}) {
  const [playlistName, setPlaylistName] = useState(name);
  const [description, setDescription] = useState(desc);
  const [image, setImage] = useState(img);
  const [imagePreview, setImagePreview] = useState(image);
  const [loading, setLoading] = useState(false);
  const { isModalOpen, setIsModalOpen } = useAppContext();

  useEffect(() => {
    const initState = () => {
      setPlaylistName(name || '');
      setDescription(desc || '');
      setImagePreview(img || null);
    };

    initState();
  }, [desc, img, isModalOpen, name]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }
  };

  const handleSave = async () => {
    if (!playlistName) {
      toast.error('Playlist name required');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('PlaylistName', playlistName);
    if (description) formData.append('Description', description);
    if (image) formData.append('Image', image);

    try {
      const response = await createPlaylist(formData);
      if (response.status === 204) {
        toast.success('Playlist created successfully');
        setIsModalOpen(false);
        if (onPlaylistCreated) {
          onPlaylistCreated();
        }
      }
    } catch (error) {
      console.error('Failed to create playlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id) => {
    const formData = new FormData();
    formData.append('PlaylistName', playlistName);
    if (description) formData.append('Description', description);
    if (image) formData.append('Image', image);

    setLoading(true);
    try {
      const response = await updatePlaylist(id, formData);
      if (response.status === 204) {
        toast.success('Playlist updated successfully');
        setIsModalOpen(false);
        if (onPlaylistCreated) {
          onPlaylistCreated();
        }
      }
    } catch (error) {
      console.error('Failed to update playlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await deletePlaylists(id);
      if (response.status === 204) {
        toast.success('Playlist deleted');
        setIsModalOpen(false);
        if (onPlaylistCreated) {
          onPlaylistCreated();
        }
      }
    } catch (error) {
      console.error('Failed to delete playlist:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popup>
      <Popup.Trigger>{trigger}</Popup.Trigger>
      <Popup.Content>
        <ModalHeader>
          {title}
          <Popup.CloseButton>
            <CloseButton>&times;</CloseButton>
          </Popup.CloseButton>
        </ModalHeader>
        <ModalBody>
          <ImagePlaceholder>
            {imagePreview ? (
              <ImagePreview src={imagePreview} alt="Selected preview" />
            ) : (
              <span>+</span>
            )}
            <InputField
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer',
              }}
            />
          </ImagePlaceholder>
          <div>
            <InputField
              type="text"
              placeholder="Enter playlist name"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              disabled={loading}
            />
            <TextArea
              placeholder="Add an optional description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
            {id ? (
              <Button
                variant="green"
                onClick={() => handleUpdate(id)}
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update'}
              </Button>
            ) : (
              <Button variant="green" onClick={handleSave} disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </Button>
            )}
            {canDelete && (
              <Button
                variant="red"
                onClick={() => handleDelete(id)}
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete'}
              </Button>
            )}
          </div>
        </ModalBody>
        <DisclaimerText>
          By continuing, you agree to allow the app to access the image you
          selected for upload. Please ensure you have the right to upload the
          image.
        </DisclaimerText>
      </Popup.Content>
    </Popup>
  );
}

export default PlaylistModal;
