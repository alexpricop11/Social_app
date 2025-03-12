from uuid import UUID

from django.core.exceptions import ValidationError

from users.models import Users


class ProfileRepository:
    def __init__(self):
        super().__init__()
        self.db = Users

    def get_user_by_id(self, user_id):
        return self.db.objects.filter(id=user_id).first()

    @staticmethod
    def edit_profile(user, validate_data):
        for key, value in validate_data.items():
            setattr(user, key, value)
        user.save()
        return user

    @staticmethod
    def change_image_profile(user, profile_image):
        max_image_size = 5 * 1024 * 1024
        if profile_image.size > max_image_size:
            raise ValidationError("Image size exceeds 5 MB limit.")
        valid_content_types = ['image/jpeg', 'image/png']
        if profile_image.content_type not in valid_content_types:
            raise ValidationError("Invalid image format. Only JPEG and PNG are allowed.")
        user.profile_image = profile_image
        user.save()
        return user

    @staticmethod
    def delete_image_profile(user):
        if user.profile_image:
            user.profile_image.delete(save=True)
        else:
            raise ValidationError("No profile image to delete.")
        return user

    @staticmethod
    def change_password(user, new_password):
        if not new_password or len(new_password) < 8:
            raise ValidationError("Password must be at least 8 characters long.")
        user.set_password(new_password)
        user.save()
        return user
