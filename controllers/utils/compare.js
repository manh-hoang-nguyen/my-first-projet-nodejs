 
 exports.locationCompare=(location1,location2)=>{
      
    if(location2.LocationType==='Point'){
       
    }
    switch(location2.LocationType) {
        case 'Point':
            if( location2.Location_point01.X===location1.Location_point01.X
                &location2.Location_point01.Y===location1.Location_point01.Y
                &location2.Location_point01.Z===location1.Location_point01.Z
                ) return true;
                else return false;
        case 'Curve':
            if( location2.Location_point01.X===location1.Location_point01.X
                &location2.Location_point01.Y===location1.Location_point01.Y
                &location2.Location_point01.Z===location1.Location_point01.Z
                &location2.Location_point02.X===location1.Location_point02.X
                &location2.Location_point02.Y===location1.Location_point02.Y
                &location2.Location_point02.Z===location1.Location_point02.Z
                ) return true;
                else return false;
        default:
          return true;
      }
}
exports.bBoxComparer=(bB1,bB2)=>{
    if(bB1.status==='1'){
        if( bB1.BoundingBox_point01.X===bB2.BoundingBox_point01.X
            &bB1.BoundingBox_point01.Y===bB2.BoundingBox_point01.Y
            &bB1.BoundingBox_point01.Z===bB2.BoundingBox_point01.Z
            &bB1.BoundingBox_point02.X===bB2.BoundingBox_point02.X
            &bB1.BoundingBox_point02.Y===bB2.BoundingBox_point02.Y
            &bB1.BoundingBox_point02.Z===bB2.BoundingBox_point02.Z
            ) return true;
            else return false;
    }
    else return true;
}
exports.centroidCompare=(cen1,cen2)=>{
    if( cen1.centroid.X===cen2.centroid.X
        &cen1.centroid.Y===cen2.centroid.Y
        &cen1.centroid.Z===cen2.centroid.Z
        ) return true;
        else return false;
}