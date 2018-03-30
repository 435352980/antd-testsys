import { makeExecutableSchema } from 'graphql-tools';
import * as vouchQuery from './resolvers/vouch';
import { depQuery, depMutation } from './resolvers/dep';
import { whQuery, whMutation } from './resolvers/wh';
import { userQuery } from './resolvers/user';

let schema = `
    #部门
    type Dep{
        name: String
        no: String
        cat: Int
        manager: String
        managerno: Int
        phone: String
        address: String
    }
    #仓库
    type Wh{
        pname: String
        pno: String
        name: String
        no: String
        cat: Int
        manager: String
        managerno: Int
        phone: String
        address: String
    }
    #用户
    type User{
        no: Int
        username: String
        nickname: String
        role: String
        pdep: String
        pdepno: Int
        email: String
        phone: String
    }
    #调拨单
    type VouchInfo{
        vouchHeader: VouchHeader
        vouchItems:[ VouchItem ]
    }
    type VouchHeader{
        code: String
	    crtdate: String
	    state: Int
	    maker: String
	    odep: String
	    idep: String
	    owh: String
	    iwh: String
        remark: String
    }
    #调拨单子项
    type VouchItem{
        id: Int
        code: String
        cat: String
        model: String
        color: String
        qty: Int
        price: Float
    }

    #根查询对象
    type Query{
        #创建单据
        createVouch(maker: String):String
        #删除单据
        deleteVouch(code: String):String
        #修改单据
        editVouch(code: String):String
        #保存单据
        saveVouch(
            code: String
            crtdate: String
            state: Int
            maker: String
            odep: String
            idep: String
            owh: String
            iwh: String
            remark: String
        ):String
        #根据条件获取单据号
        getVouchCodes( 
            code: String 
            from: String 
            to: String 
            state: Int 
            maker: String 
            odep: String 
            idep: String 
            owh: String 
            iwh: String 
        ):[String]
        #获取单据表头信息
        getVouchInfo( code: String ): VouchInfo
        #添加单据表体项
        addVouchItem( 
            code: String 
            cat: String 
            model: String 
            color: String 
            qty: Int 
            price: Float 
        ): String
        #删除单据子项
        deleteVouchItem( id: Int ): String
        #更新单据子项
        updateVouchItem(
            id: Int 
            cat: String 
            model: String 
            color: String 
            qty: Int 
            price: Float
        ):String
        #获取单据表体信息
        getVouchItems( code: String ): [ VouchItem ]
        getDep:[ Dep ]
        getWh:[ Wh ]
        getUser:[ User ]
    }
    #根处理对象
    type Mutation{
        addDep(
            name: String
            cat: Int
            manager: String
            managerno: Int
            phone: String
            address: String
        ):String
        deleteDep(no:String):String
        addWh(
            pname: String
            pno: String
            name: String
            cat: Int
            manager: String
            managerno: Int
            phone: String
            address: String
        ):String
        deleteWh(no:String):String
    }

    #schema
    schema{
        query: Query
        mutation: Mutation
    }
`;

export default makeExecutableSchema({
	typeDefs: schema,
	resolvers: {
		Query: { ...vouchQuery, ...depQuery, ...whQuery, ...userQuery },
		Mutation: { ...depMutation, ...whMutation }
	}
});
