--[[
1) get user_id; (from keys[1])
2) get sort_by parameter as KEYS[2]
3) get start_limit and end_limit.
4) get meeting filtered set;
5) get client_for_user:x set;
6) iterate through meeting filtered set and get client id of that particular meeting from hashmap.
	6.1) check if that client id is member of set "client_for_user:x"
	6.2) store that meeting_id into a set, so that later we can perform sorting on that set.
7) sort the obtained filterd meeting set and apply limit over it.
8) fetch the details from the meeting:id from the hashmap.
	8.1) To fetch you can run a loop over available meeting ids and do 'hget key details'// key is the meeting_id
--]]

local user_id = KEYS[1] --  get user_id;

local sort_by = KEYS[2]
local start_limit = KEYS[3]
local end_limit = KEYS[4]

local meeting_filter_set = redis.call("sinterstore", "sampleset1"..user_id,  unpack(ARGV)) -- meeting filtered set.
local mfs = redis.call("sinter", unpack(ARGV)) -- meeting filtered set.

local clients_for_user_set_name = 'clients_for_user:'..user_id

local members_of_clients = redis.call("smembers", clients_for_user_set_name) -- client_for_user:x

-- iterating through meeting filtered set
for _,key in ipairs(mfs) do
	local obtained_client_ids = redis.call("HGET", 'meeting:'..key, "clientid")
	-- check if clientid obtained is contained in "members_of_clients"
	local val = redis.call("sismember", clients_for_user_set_name, obtained_client_ids)
	-- check if val is 0 or 1. If val == 1, store meeting:id into a set (or if val == 0, delete meetingid from the meeting_filtered_set)
	if val == 1 then
		redis.call("sadd", "sampleset2"..user_id, 'meeting:'..key)
	end
end

--[[local val2 = redis.call("sort", "sampleset1", "get", "meeting:*->clientid")--]]

-- get the members from set named "sampleset1"..user_id
local security_level_filter = redis.call("smembers", "sampleset2"..user_id)

-- use security_level_filter set name to sort according to whatever is passed as keys[2]
local sorted_content = redis.call("sort", "sampleset2"..user_id, "by", '*->'..sort_by, "limit" , start_limit, end_limit);

local allString = ""

-- fetch the details section from the hashmap of meeting:ids
for k, value in ipairs(sorted_content) do
	local details_str = redis.call("HGET", value, "details")
	allString = allString..', '..tostring(details_str)
end


return allString

--[[
Bugs:
1) 	new elements get appended with old elements in the sets created in memory, eg : sampleset1..user_id,
	sampleset2..user_id. this creates problem in getting the required meeting_ids after filtering.
--]]
