import logging

from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from tutorial.quickstart.serializers import UserSerializer

from users.models import Users
from users.serializers.profile import EditProfileSerializer
from users.services.profile import ProfileService
from users.services.search_user import SearchUserService

logger = logging.getLogger(__name__)


class Profile(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JSONWebTokenAuthentication]

    def get(self, request, **kwargs):
        service = ProfileService()
        try:
            user_id = kwargs.get("user_id")
            if user_id:
                target_user = get_object_or_404(Users, id=user_id)
                profile_data = service.get_other_profile(request, target_user)
            else:
                profile_data = service.get_profile(request.user.id)
            return Response(profile_data)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.error(f"Unexpected error: {e}")
            return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class EditProfile(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JSONWebTokenAuthentication]

    def __init__(self):
        super().__init__()
        self.service = ProfileService()

    def put(self, request):
        serializer = EditProfileSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            try:
                updated_user = self.service.edit_profile(request.user.id, serializer.validated_data)
                logger.info(updated_user)
                return Response(EditProfileSerializer(updated_user).data, status=status.HTTP_200_OK)
            except ValidationError as e:
                logger.error(f"Eroare: {e}")
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        logger.error(f'Serializer: {serializer.errors}')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def change_image_profile(request):
    try:
        image = request.FILES.get('profile_image', None)
        if not image:
            return Response({"error": "No image file provided."}, status=status.HTTP_400_BAD_REQUEST)

        service = ProfileService()
        updated_user = service.change_profile_image(user_id=request.user.id, image=image)
        return Response({
            "message": "Profile image updated successfully.",
            "profile_image_url": updated_user.profile_image.url
        }, status=status.HTTP_200_OK)
    except ValidationError as e:
        logger.error(f"Validation error: {e}")
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return Response({"error": "An unexpected error occurred."},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_image_profile(request):
    try:
        service = ProfileService()
        updated_user = service.delete_profile_image(user_id=request.user.id)
        return Response({
            "message": "Profile image deleted successfully.",
            "profile_image_url": updated_user.profile_image.url if updated_user.profile_image else None
        }, status=status.HTTP_200_OK)
    except ValidationError as e:
        logger.error(f"Validation error: {e}")
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return Response({"error": "An error occurred while deleting the profile image."},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def change_password(request):
    try:
        new_password = request.data.get('new_password')
        if not new_password:
            return Response({"error": "New password is required."}, status=status.HTTP_400_BAD_REQUEST)
        current_password = request.data.get('current_password')
        if current_password and not request.user.check_password(current_password):
            return Response({"error": "Current password is incorrect."}, status=status.HTTP_400_BAD_REQUEST)
        service = ProfileService()
        updated_user = service.change_password(request.user.id, new_password)
        logger.info(f"Password changed successfully for user {updated_user.id}")
        return Response({"message": "Password changed successfully."}, status=status.HTTP_200_OK)

    except ValidationError as e:
        logger.error(f"Validation error during password change: {e}")
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        logger.error(f"Unexpected error during password change: {e}")
        return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
# @authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def search_user(request, user):
    try:
        result = SearchUserService.search_user(user, request.user.username)
        return Response(result, status=status.HTTP_200_OK)
    except Exception as ex:
        return Response(ex, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
