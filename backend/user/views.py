from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .user.serializers import UserRegisterSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
import logging
# Create your views here.
logger = logging.getLogger(__name__)

# User Registeration API
class UserRegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            user_data = {
                'user_id': user.id,
                'username': user.username
            }
            # Return response with tokens
            logger.info("User Registered Successfully")
            return Response({
                'user_data': user_data ,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        logger.error("User Registration Failed")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#GET User
class UserDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            # Serialize user data
            return Response({
                'user_id': user.id,
                'username': user.username,
                'email': user.email
            }, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response(
                {"detail": "No User matches the given query."},
                status=status.HTTP_404_NOT_FOUND
            )
