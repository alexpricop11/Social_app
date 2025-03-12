from datetime import datetime

from rest_framework import serializers
from users.models import Users


class UserProfileSerializer(serializers.ModelSerializer):
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()

    class Meta:
        model = Users
        fields = [
            'profile_image', 'username', 'phone_number', 'email', 'birthday',
            'followers_count', 'following_count', 'followers', 'following'
        ]

    @staticmethod
    def get_followers_count(user):
        return user.followers.count()

    @staticmethod
    def get_following_count(user):
        return user.following.count()

    @staticmethod
    def get_followers(user):
        return [follower.username for follower in user.followers.all()]

    @staticmethod
    def get_following(user):
        return [following_user.username for following_user in user.following.all()]


class EditProfileSerializer(serializers.ModelSerializer):
    birthday = serializers.DateField(
        required=False,
        allow_null=True,
        input_formats=['%d/%m/%Y', '%Y-%m-%d'],
        format='%d/%m/%Y'
    )

    class Meta:
        model = Users
        fields = ['username', 'phone_number', 'email', 'birthday']

    @staticmethod
    def validate_birthday(value):
        if value:
            today = datetime.now().date()
            if value > today:
                raise serializers.ValidationError("Birthday cannot be in the future.")
            if (today.year - value.year) > 120:
                raise serializers.ValidationError("Birthday seems invalid.")
        return value

    def validate_username(self, value):
        if Users.objects.exclude(id=self.instance.id).filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken")
        return value


class OtherProfileSerializer(serializers.ModelSerializer):
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()
    is_follow = serializers.SerializerMethodField()

    class Meta:
        model = Users
        fields = [
            'id', 'profile_image', 'username', 'followers_count', 'following_count', 'followers', 'following',
            'is_follow'
        ]

    @staticmethod
    def get_followers_count(user):
        return user.followers.count()

    @staticmethod
    def get_following_count(user):
        return user.following.count()

    @staticmethod
    def get_followers(user):
        return [follower.username for follower in user.followers.all()]

    @staticmethod
    def get_following(user):
        return [following_user.username for following_user in user.following.all()]

    def get_is_follow(self, user):
        request = self.context.get('request')
        if request and request.user.following.filter(id=user.id).exists():
            return True
        return False
