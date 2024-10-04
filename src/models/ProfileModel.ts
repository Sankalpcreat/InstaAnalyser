import { Schema, model, models, Document } from 'mongoose';

export interface IProfile extends Document {
  username: string;
  full_name: string;
  profile_picture: string;
  followers: number;
  following: number;
  media_count: number;
  engagementRate: number;
  topHashtags: string[];
  mostLikedPost: string;
  mostCommentedPost: string;
  lastAnalyzed: Date;
}


const ProfileSchema = new Schema<IProfile>({
  username: { type: String, required: true, unique: true }, 
  full_name: { type: String },
  profile_picture: { type: String },
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
  media_count: { type: Number, default: 0 },
  engagementRate: { type: Number, default: 0 }, 
  topHashtags: { type: [String], default: [] }, 
  mostLikedPost: { type: String }, 
  mostCommentedPost: { type: String },
  lastAnalyzed: { type: Date, default: Date.now },
});


const Profile = models.Profile || model<IProfile>('Profile', ProfileSchema);

export default Profile;
