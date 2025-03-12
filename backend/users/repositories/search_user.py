from users.models import Users


class SearchUserRepository:

    @staticmethod
    def search_user(user, username):
        search = Users.objects.filter(username__icontains=user).exclude(username=username)
        if search.exists():
            return [{"id": users.id, "username": users.username} for users in search]
        return []
