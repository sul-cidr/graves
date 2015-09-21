
json.array! @counties do |county|
  json.extract!(
    county,
    :id,
    :province_id,
    :name_p,
    :name_c,
    :geojson,
  )
end
