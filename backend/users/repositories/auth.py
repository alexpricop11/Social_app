from django.core.exceptions import ValidationError

from users.models import Users


class AuthRepository:
    def __init__(self):
        super().__init__()

    @staticmethod
    def create_user(username, email, phone_number, birthday, password):
        if Users.objects.filter(username=username).exists():
            from django.core.exceptions import ValidationError
            raise ValidationError('This user already exists')
        user = Users(
            username=username,
            email=email,
            phone_number=phone_number,
            birthday=birthday
        )
        user.set_password(password)
        user.save()
        return user

    @staticmethod
    def get_user_by_username(username):
        return Users.objects.filter(username=username).first()

    @staticmethod
    def check_username_exists(username):
        return Users.objects.filter(username=username).exists()
