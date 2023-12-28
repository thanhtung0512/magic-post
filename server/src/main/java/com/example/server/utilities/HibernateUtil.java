package com.example.server.utilities;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import com.example.server.domain.CompanyLeader;
import com.example.server.domain.Customer;
import com.example.server.domain.DeliveryOrder;
import com.example.server.domain.GatheringPoint;
import com.example.server.domain.Goods;
import com.example.server.domain.PointLeaderAtGatheringPoint;
import com.example.server.domain.PointLeaderAtTransactionPoint;
import com.example.server.domain.Role;
import com.example.server.domain.StaffAtGatheringPoint;
import com.example.server.domain.Teller;
import com.example.server.domain.TransactionPoint;
import com.example.server.domain.TransactionPointGatheringPoint;
import com.example.server.domain.User;
import org.springframework.stereotype.Component;
import jakarta.transaction.Transaction;

@Component
public class HibernateUtil {

    private static String currentDB = "bblipzsuaomfkih4bdzx";
    private static String port = "3306";
    private static String pass = "3NasSaj0OS8vmH9ZpPbY";
    private static String user = "utxn8kpxkal81q5c";
    private static String host = "jdbc:mysql://utxn8kpxkal81q5c:3NasSaj0OS8vmH9ZpPbY@bblipzsuaomfkih4bdzx-mysql.services.clever-cloud.com:";

    private static String url = "jdbc:mysql://utxn8kpxkal81q5c:3NasSaj0OS8vmH9ZpPbY@bblipzsuaomfkih4bdzx-mysql.services.clever-cloud.com:3306/bblipzsuaomfkih4bdzx";

    private static SessionFactory sessionFactory;

    public static Session getSession(String concreteDatabase, Class<?>... annotatedClass) {
        if (sessionFactory == null) {
            Configuration configuration = new Configuration()
                    .setProperty("hibernate.connection.url", url)
                    .setProperty("hibernate.connection.username", "hbstudent")
                    .setProperty("hibernate.connection.password", "hbstudent")
                    .setProperty("hibernate.dialect", "org.hibernate.dialect.MySQL8Dialect"); // add your entity classes
                                                                                              // here
            for (int i = 0; i < annotatedClass.length; i++) {
                configuration.addAnnotatedClass(annotatedClass[i]);
            }
            sessionFactory = configuration.buildSessionFactory();
        }
        return sessionFactory.openSession();
    }

    public static Session getSession(String concreteDatabase, String port, String user, String password,
            Class<?>... annotatedClass) {
        if (sessionFactory == null) {
            Configuration configuration = new Configuration()
                    .setProperty("hibernate.connection.url", url)
                    .setProperty("hibernate.connection.username", user)
                    .setProperty("hibernate.connection.password", password)
                    .setProperty("hibernate.dialect", "org.hibernate.dialect.MySQL8Dialect")
                    .setProperty("hibernate.show_sql", "true"); // add your entity classes here
            for (int i = 0; i < annotatedClass.length; i++) {
                configuration.addAnnotatedClass(annotatedClass[i]);
            }
            sessionFactory = configuration.buildSessionFactory();
        }
        return sessionFactory.openSession();
    }

    public static SessionFactory getSessionFactory(String concreteDatabase, String port, String user, String password,
            Class<?>... annotatedClass) {
        if (sessionFactory == null) {
            Configuration configuration = new Configuration()
                    .setProperty("hibernate.connection.url", url)
                    .setProperty("hibernate.connection.username", user)
                    .setProperty("hibernate.connection.password", password)
                    .setProperty("hibernate.dialect", "org.hibernate.dialect.MySQL8Dialect")
                    .setProperty("hibernate.show_sql", "true")
            /* .setProperty("hibernate.hbm2ddl.auto", "create") */; // mysql://localhost:3306/your_databaseadd your
                                                                    // entity classes here
            for (int i = 0; i < annotatedClass.length; i++) {
                configuration.addAnnotatedClass(annotatedClass[i]);
            }
            sessionFactory = configuration.buildSessionFactory();
        }
        return sessionFactory;
    }

    public static SessionFactory getSessionFactory() {
        return getSessionFactory(currentDB, port, user, pass, CompanyLeader.class, Customer.class, DeliveryOrder.class,
                GatheringPoint.class, Goods.class, PointLeaderAtGatheringPoint.class,
                PointLeaderAtTransactionPoint.class, Role.class, StaffAtGatheringPoint.class, Teller.class,
                TransactionPoint.class, TransactionPointGatheringPoint.class, User.class);
    }

}
