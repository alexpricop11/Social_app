from django.urls import path
from users.views import profile, auth

urlpatterns = [
    path('register', auth.Register.as_view()),
    path('login', auth.Login.as_view()),
    path('change-image-profile', profile.change_image_profile),
    path('delete-image-profile', profile.delete_image_profile),
    path('profile', profile.Profile.as_view()),
    path('profile/<uuid:user_id>/', profile.Profile.as_view()),
    path('edit-profile', profile.EditProfile.as_view()),
    path('change-password', profile.change_password),
    path('search-user/<str:user>/', profile.search_user),
]
