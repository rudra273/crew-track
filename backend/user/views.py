from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserRegisterSerializer
import logging
# Create your views here.
logger = logging.getLogger(__name__)

# User Registeration API
class UserRegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user_data = {
                'user_id': user.id,
                'username': user.username,
                'email': user.email
            }
            logger.info("User Registered Successfully")
            return Response({
                'message': "User Registered successfully",
                'user_data': user_data
            }, status=status.HTTP_201_CREATED)
         
        logger.error("User Registration Failed")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#GET User
class UserDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        user = request.user
        return Response({
            'user_id': user.id,
            'username': user.username,
            'email': user.email
        }, status=status.HTTP_200_OK)
