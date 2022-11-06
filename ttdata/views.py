import imp
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
#
from api.serializers import ELogSerializer
from .models import Clone

from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
@api_view(['POST'])
@permission_classes([AllowAny])
def logs(request, id):
    if request.method == 'POST':
        data = request.data
        try:
            cloned = Clone.objects.get(tt_id = id)
        except:
            cloned = None
        
        if cloned and cloned.eld_id and data:
            driver_id = cloned.eld_id

            # new_log = ELogSerializer(data=request.data)
            errors = []

            for d in data:
                d["driver"] = driver_id
                new_log = ELogSerializer(data=d)
                if new_log.is_valid():
                    new_log.save()
                else:
                    errors.append(new_log.errors)

            if errors == []:
                return Response({"success": "all good"}, status=status.HTTP_200_OK)
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            if not cloned:
                new_clone = Clone()
                new_clone.tt_id = id
                new_clone.eld_id = None
                new_clone.save()
        return Response({"success": "driver not found but noted"}, status=status.HTTP_200_OK)
        