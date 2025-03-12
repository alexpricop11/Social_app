from django.core.exceptions import ValidationError

from users.repositories.profile import ProfileRepository
from users.serializers.profile import UserProfileSerializer, OtherProfileSerializer


class ProfileService:
    def __init__(self):
        self.repository = ProfileRepository()

    def get_profile(self, user_id):
        profile = self.repository.get_user_by_id(user_id)
        if not profile:
            raise ValueError("Profile not found")
        return UserProfileSerializer(profile).data

    @staticmethod
    def get_other_profile(request, target_user):
        serializer = OtherProfileSerializer(target_user, context={'request': request})
        return serializer.data

    def edit_profile(self, user_id, validate_data):
        user = self.repository.get_user_by_id(user_id)
        if not user:
            raise ValidationError("User not found")
        return self.repository.edit_profile(user, validate_data)

    def change_profile_image(self, user_id, image):
        user = self.repository.get_user_by_id(user_id)
        if not user:
            raise ValidationError("User not found")
        return self.repository.change_image_profile(user, image)

    def delete_profile_image(self, user_id):
        user = self.repository.get_user_by_id(user_id)
        if not user:
            raise ValidationError("User not found")
        return self.repository.delete_image_profile(user)

    def change_password(self, user_id, new_password):
        user = self.repository.get_user_by_id(user_id)
        if not user:
            raise ValidationError("User not found")
        return self.repository.change_password(user, new_password)
